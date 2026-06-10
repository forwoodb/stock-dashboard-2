import pandas as pd
import yfinance as yf
from pymongo import MongoClient
# import os

# dbUrl = 'mongodb://localhost:27017'
dbUrl = 'mongodb+srv://forwoodb:q84ItPYwNm77gfFO@cluster0.7vsg6zn.mongodb.net/?appName=Cluster0'
# dbUrl = os.environ.get('MONGODB_URL')

# client = MongoClient(dbUrl)

# https://stackoverflow.com/questions/74721623/how-do-you-use-pymongo-to-connect-to-mongodb-atlas
client = MongoClient(dbUrl, tls=True, tlsAllowInvalidCertificates=True)

# print(client.admin.command("ping"))
db = client['test']

collection = db['stocks']

for stock in collection.find():
  data = yf.download(tickers=stock['ticker'], period='200d', interval='1d')

  # Reset the index to make 'Date' a regular column
  data.reset_index(inplace=True)

  df = pd.DataFrame(data).round(2)

  df = df.rename(columns={'Ticker': 'ticker'})
  df['ticker'] = stock['ticker']

  df.columns = df.columns.droplevel(1)

  df['200D'] = df['Close'].rolling(200).mean().round(2)
  df['100D'] = df['Close'].rolling(100).mean().round(2)
  df['50D'] = df['Close'].rolling(50).mean().round(2)
  df['20D'] = df['Close'].rolling(20).mean().round(2)
  df['10D'] = df['Close'].rolling(10).mean().round(2)
  df['5D'] = df['Close'].rolling(5).mean().round(2)
  print(df)
