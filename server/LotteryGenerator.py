from flask import jsonify
from flask_restful import Api, Resource
from server.main_functions import download_lotto_csv, get_probabilities, generate_lottery_numbers

class LotteryGenerator(Resource):
    def get(self, lotto_type):
        lottery_numbers = download_lotto_csv(lotto_type)
        probabilities = get_probabilities(lottery_numbers)
        result = generate_lottery_numbers(probabilities)
        
        response = [int(item) for item in result]
        response = jsonify(response)

        return response