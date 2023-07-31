from flask import Flask
from flask_restful import Api, Resource
from flask_cors import CORS
from server.LotteryGenerator import LotteryGenerator

app = Flask(__name__)
CORS(app)
api = Api(app)

class App(Resource):
    def get(self):
        return {'message': '200, OK'}

api.add_resource(App, '/')
api.add_resource(LotteryGenerator, '/generate/<int:lotto_type>')

if __name__ == '__main__':
    app.run(debug=False)