from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn import tree
import pandas as pd
import joblib
import matplotlib.pyplot as plt




def train_module(user, pattern):

    try: 
        model = joblib.load('password-patterns.joblib')
        model.fit([pattern], [[user]])
        print("successfully executed")
    except Exception as e:
        model = DecisionTreeClassifier()
        model.fit([pattern], [[user]])
        print(e)
    
    joblib.dump(model, 'password-patterns.joblib')


def predict_module(pattern):
    model = joblib.load('password-patterns.joblib')
    who = model.predict([pattern])
    return who 