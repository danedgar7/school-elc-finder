
import pandas as pd, numpy as np
CRITERIA = ["Cost","Education","Staff","Facilities","Reputation","NQS"]
def load_data(path="centre_scores.csv"):
    return pd.read_csv(path)
def compute_scores(df, weights):
    w = np.array([weights[c] for c in CRITERIA])
    tot = w.sum() if w.sum()>0 else 1
    df2 = df.copy()
    df2["Composite"] = (df2[CRITERIA] * w).sum(axis=1) / tot
    wins=[]
    X = df2[CRITERIA].values * w
    for i in range(len(df2)):
        better=0
        for j in range(len(df2)):
            if i==j: continue
            gt=(X[i]>X[j]).sum()
            lt=(X[i]<X[j]).sum()
            if gt>lt: better+=1
        wins.append(better)
    df2["PairwiseWins"]=wins
    df2=df2.sort_values(["Composite","PairwiseWins"],ascending=[False,False]).reset_index(drop=True)
    df2.index+=1
    return df2
