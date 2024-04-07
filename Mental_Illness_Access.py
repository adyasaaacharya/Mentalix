import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import sys

mental_illness_data = pd.read_csv('Mental_Illness_Good.csv')
# print(mental_illness_data)
x = mental_illness_data.drop(columns=['Prognosis'])
# print(x)
y = mental_illness_data['Prognosis']
# print(y)

model = DecisionTreeClassifier()
model.fit(x, y)

list = sys.argv[1].split(',')
list = [int(num) for num in list]
# print(list)

predictions = model.predict([list])

print(predictions)