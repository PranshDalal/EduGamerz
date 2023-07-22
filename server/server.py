from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

board = [' '] * 9
current_player = 'X'

questions = {
    "What color is the sky?": "blue",
    "What is 2 + 2?": "4",
    "What is the capital of France?": "paris"
}

current_question = None


def check_win(player):
    pass


def is_board_full():
    return all(cell != ' ' for cell in board)


def computer_move():
    empty_cells = [index for index, cell in enumerate(board) if cell == ' ']
    if empty_cells:
        return random.choice(empty_cells)
    return None


@app.route("/api/tictactoe/response", methods=['GET', 'POST'])
def tictactoe_response():
    global current_player, current_question, board

    if current_question is None or request.method == 'GET':
        current_question = random.choice(list(questions.keys()))

    if request.method == 'POST':
        data = request.get_json()
        question = data.get('question')
        answer = data.get('answer')

        if question == current_question:
            correct_answer = questions.get(question)
            if answer.lower() == correct_answer.lower():
                current_player = 'X'
                current_question = None

                empty_cells = [index for index, cell in enumerate(board) if cell == ' ']
                if empty_cells:
                    random_position = random.choice(empty_cells)
                    board[random_position] = 'X'

                    if check_win('X'):
                        return jsonify({
                            'message': 'You win!',
                            'board': board,
                            'question': None
                        }), 200

                    if is_board_full():
                        return jsonify({
                            'message': 'It\'s a draw!',
                            'board': board,
                            'question': None
                        }), 200

                    current_player = 'O'
                    computer_position = computer_move()
                    if computer_position is not None:
                        board[computer_position] = 'O'

                        if check_win('O'):
                            return jsonify({
                                'message': 'Computer wins!',
                                'board': board,
                                'question': None
                            }), 200

                    current_player = 'X'
                    current_question = random.choice(list(questions.keys()))
                else:
                    return jsonify({
                        'message': 'It\'s a draw!',
                        'board': board,
                        'question': None
                    }), 200
            else:
                return jsonify({
                    'message': 'Incorrect answer. Try again.',
                    'board': board,
                    'question': current_question
                }), 400

    return jsonify({
        'message': 'Answer the question to place your X or O.',
        'question': current_question,
        'board': board,
        'currentPlayer': current_player
    })


crossword_data = {
    "grid": [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
    ],
    "clues": {
        "1 Across": "",
        "1 Down": "",
        "2 Down": "",
        "3 Down": "",
        "4 Down": "",
    },
    "answers": {
        "1 Across": None,
        "1 Down": None,
        "2 Down": None,
        "3 Down": None,
        "4 Down": None,
    },
}

current_game = None


@app.route("/api/crossword/game", methods=['GET', 'POST'])
def crossword_game():
    global current_game

    if current_game is None:
        current_game = crossword_data.copy()

    if request.method == 'POST':
        data = request.get_json()
        clue = data.get('clue')
        answer = data.get('answer')

        if not clue or not answer:
            return jsonify({"error": "Invalid data format."}), 400

        if clue not in current_game['answers']:
            return jsonify({"error": "Invalid clue."}), 400

        correct_answer = current_game['answers'][clue]
        if correct_answer is not None:
            return jsonify({"message": "This clue has already been answered."}), 400

        correct_answer = current_game['answers'][clue]
        if answer.upper() == current_game['answers'][clue]:
            current_game['answers'][clue] = answer.upper()
            return jsonify({"message": "Correct answer!", "clue": clue}), 200
        else:
            return jsonify({"message": "Incorrect answer. Try again.", "clue": clue}), 400

    return jsonify(current_game)



if __name__ == "__main__":
    app.run(debug=True)
