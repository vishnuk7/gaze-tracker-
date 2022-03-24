import matplotlib.pyplot as plt
import pandas as pd

df = pd.read_csv('d.csv')


df.plot.scatter(x = 'x', y = 'y')


# plt.scatter(x, y)
plt.show()
