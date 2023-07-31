import requests
import pandas as pd
import io
import random

# Define the column names in the CSV file
COLUMN_NAMES = ["No.", "Dates", "One", "Two", "Three", "Four", "Five", "Six"]

def get_filename(lotto_type):
    """Get the filename based on the lotto type."""
    lotto_types = {
        42: 'lotto_6_42',
        45: 'mega_lotto_6_45',
        49: 'super_lotto_6_49',
        55: 'grand_lotto_6_55',
        58: 'ultra_lotto_6_58'
    }
    
    return lotto_types.get(lotto_type)

def download_lotto_csv(lotto_type):
    """
    Download lottery numbers CSV file for the specified lotto type.

    If the file is not available, a fallback data file will be used.
    """
    link = f"https://www.pcsodraw.com/download/{ get_filename(lotto_type) }.csv"
    response = requests.get(link, timeout=3)

    if response.status_code != 200:
        df = pd.read_csv(f'./fallback_data/{ get_filename(lotto_type) }.csv', names=COLUMN_NAMES)
    else:
        df = pd.read_csv(io.StringIO(response.text), names=COLUMN_NAMES)

    for column in COLUMN_NAMES[2:]:
        df = df[df[column] != 'xx']  # Filter out rows with 'xx' as they represent invalid data

    lottery_numbers = df[COLUMN_NAMES[2:]]
    lottery_numbers = lottery_numbers.astype(int) # Convert to i
    lottery_numbers.dropna(inplace=True)

    return lottery_numbers

def get_probabilities(lottery_numbers):
    """
    Calculate probabilities of each number being drawn in the lottery.

    Returns a dictionary containing the probabilities for each number column.
    """
    probabilities = {}

    for column in COLUMN_NAMES[2:]:
        probabilities[column] = lottery_numbers[column].value_counts(normalize=True)

    return probabilities

def has_duplicates(arr):
    """Check if a list of numbers has any duplicates."""
    unique_elements = set(arr)
    return len(arr) != len(unique_elements)

def generate_lottery_numbers(probabilities):
    """
    Generate a set of lottery numbers with no duplicates based on probabilities.

    Returns a list containing the generated lottery numbers.
    """
    while True:
        random_numbers = []

        for column in COLUMN_NAMES[2:]:
            random_number = random.choices(
                population=probabilities[column].index,
                weights=probabilities[column].values,
                k=1
            )[0]

            random_numbers.append(random_number)

        if not has_duplicates(random_numbers):
            break

    return random_numbers