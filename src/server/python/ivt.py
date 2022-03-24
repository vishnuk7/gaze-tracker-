# -*- coding: utf-8 -*-

import numpy
import pandas as pd
import csv

def remove_missing(x, y, time, missing):
	mx = numpy.array(x==missing, dtype=int)
	my = numpy.array(y==missing, dtype=int)
	x = x[(mx+my) != 2]
	y = y[(mx+my) != 2]
	time = time[(mx+my) != 2]
	return x, y, time

#maxdist was 25 as default
def fixation_detection(x, y, time, missing=0.0, maxdist=50, mindur=150):

	"""Detects fixations, defined as consecutive samples with an inter-sample
	distance of less than a set amount of pixels (disregarding missing data)

	arguments
	x		-	numpy array of x positions
	y		-	numpy array of y positions
	time		-	numpy array of EyeTribe timestamps
	keyword arguments
	missing	-	value to be used for missing data (default = 0.0)
	maxdist	-	maximal inter sample distance in pixels (default = 25)
	mindur	-	minimal duration of a fixation in milliseconds; detected
				fixation cadidates will be disregarded if they are below
				this duration (default = 100)

	returns
	Sfix, Efix
				Sfix	-	list of lists, each containing [starttime]
				Efix	-	list of lists, each containing [starttime, endtime, duration, endx, endy]
	"""

	x, y, time = remove_missing(x, y, time, missing)

	# empty list to contain data
	Sfix = []
	Efix = []

	# loop through all coordinates
	si = 0
	fixstart = False
	for i in range(1,len(x)):
		# calculate Euclidean distance from the current fixation coordinate
		# to the next coordinate
		squared_distance = ((x[si]-x[i])**2 + (y[si]-y[i])**2)
		dist = 0.0
		if squared_distance > 0:
			dist = squared_distance**0.5
		# check if the next coordinate is below maximal distance
		if dist <= maxdist and not fixstart:
			# start a new fixation
			si = 0 + i
			fixstart = True
			Sfix.append([time[i]])
		elif dist > maxdist and fixstart:
			# end the current fixation
			fixstart = False
			# only store the fixation if the duration is ok
			if time[i-1]-Sfix[-1][0] >= mindur:
				Efix.append([Sfix[-1][0], time[i-1], time[i-1]-Sfix[-1][0], x[si], y[si]])
			# delete the last fixation start if it was too short
			else:
				Sfix.pop(-1)
			si = 0 + i
		elif not fixstart:
			si += 1
	#add last fixation end (we can lose it if dist > maxdist is false for the last point)
	if len(Sfix) > len(Efix):
		Efix.append([Sfix[-1][0], time[len(x)-1], time[len(x)-1]-Sfix[-1][0], x[si], y[si]])
	return Sfix, Efix

def saccade_detection(x, y, time, missing=0.0, minlen=100, maxvel=500, maxacc=1000):

	"""Detects saccades, defined as consecutive samples with an inter-sample
	velocity of over a velocity threshold or an acceleration threshold

	arguments
	x		-	numpy array of x positions
	y		-	numpy array of y positions
	time		-	numpy array of tracker timestamps in milliseconds
	keyword arguments
	missing	-	value to be used for missing data (default = 0.0)
	minlen	-	minimal length of saccades in milliseconds; all detected
				saccades with len(sac) < minlen will be ignored
				(default = 5)
	maxvel	-	velocity threshold in pixels/second (default = 40)
	maxacc	-	acceleration threshold in pixels / second**2
				(default = 340)

	returns
	Ssac, Esac
			Ssac	-	list of lists, each containing [starttime]
			Esac	-	list of lists, each containing [starttime, endtime, duration, startx, starty, endx, endy]
	"""

	# CONTAINERS
	Ssac = []
	Esac = []

	# INTER-SAMPLE MEASURES
	# the distance between samples is the square root of the sum
	# of the squared horizontal and vertical interdistances
	intdist = (numpy.diff(x)**2 + numpy.diff(y)**2)**0.5
	# get inter-sample times
	inttime = numpy.diff(time)
	# recalculate inter-sample times to seconds
	inttime = inttime / 1000.0

	# VELOCITY AND ACCELERATION
	# the velocity between samples is the inter-sample distance
	# divided by the inter-sample time
	vel = intdist / inttime
	# the acceleration is the sample-to-sample difference in
	# eye movement velocity
	acc = numpy.diff(vel)

	# SACCADE START AND END
	t0i = 0
	stop = False
	while not stop:
		# saccade start (t1) is when the velocity or acceleration
		# surpass threshold, saccade end (t2) is when both return
		# under threshold

		# detect saccade starts
		sacstarts = numpy.where((vel[1+t0i:] > maxvel).astype(int) + (acc[t0i:] > maxacc).astype(int) >= 1)[0]
		if len(sacstarts) > 0:
			# timestamp for starting position
			t1i = t0i + sacstarts[0] + 1
			if t1i >= len(time)-1:
				t1i = len(time)-2
			t1 = time[t1i]

			# add to saccade starts
			Ssac.append([t1])

			# detect saccade endings
			sacends = numpy.where((vel[1+t1i:] < maxvel).astype(int) + (acc[t1i:] < maxacc).astype(int) == 2)[0]

			if len(sacends) > 0:
				# timestamp for ending position
				t2i = sacends[0] + 1 + t1i + 2
				if t2i >= len(time):
					t2i = len(time)-1
				t2 = time[t2i]
				dur = t2 - t1

				# ignore saccades that did not last long enough
				if dur >= minlen:
					# add to saccade ends
					Esac.append([t1, t2, dur, x[t1i], y[t1i], x[t2i], y[t2i]])
				else:
					# remove last saccade start on too low duration
					Ssac.pop(-1)

				# update t0i
				t0i = 0 + t2i
			else:
				stop = True
		else:
			stop = True



	return Ssac, Esac

#read data
df = pd.read_csv('http://localhost:4000/data')

#point X(x coordinate)
x = df.x

#point Y(y coordinate)
y = df.y

#timestamp
time=df.ts

import sys
# max_dist = int(sys.argv[1])


#sfix contains only start time
#efix contains start time, end time, duration, start x, start y
sfix,efix = fixation_detection(x, y, time)
# ssac, esac = saccade_detection(x, y, time)

print(efix)
# print(esac)
# return efix


with open('extractedFixations.csv', 'w') as file:
    write = csv.writer(file)
    write.writerows(efix)
