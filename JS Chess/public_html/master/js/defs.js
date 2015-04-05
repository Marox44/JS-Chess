var SQUARE_AMOUNT = 120;

var FILES = {
    FILE_A: 0,
    FILE_B: 1,
    FILE_C: 2,
    FILE_D: 3,
    FILE_E: 4,
    FILE_F: 5,
    FILE_G: 6,
    FILE_H: 7,
    FILE_NONE: 8
};

var RANKS = {
    RANK_1: 0,
    RANK_2: 1,
    RANK_3: 2,
    RANK_4: 3,
    RANK_5: 4,
    RANK_6: 5,
    RANK_7: 6,
    RANK_8: 7,
    RANK_NONE: 8
};

var SQUARES = {
    A1: 21,
    B1: 22,
    C1: 23,
    D1: 24,
    E1: 25,
    F1: 26,
    G1: 27,
    H1: 28,
    A8: 91,
    B8: 92,
    C8: 93,
    D8: 94,
    E8: 95,
    F8: 96,
    G8: 97,
    H8: 98,
    NO_SQ: 99,
    OFFBOARD: 100
};

var CASTLEBIT = {
  WKCA: 1,
  WQCA: 2,
  BKCA: 4,
  BQCA: 8    
};


var PIECE_COLOR = {
    WHITE: 0,
    BLACK: 1,
    BOTH: 2
};

var PIECE_FIGURE = {
    PAWN: 0,
    KNIGHT: 1,
    BISHOP: 2,
    ROOK: 3,
    QUEEN: 4,
    KING: 5
};

function PIECE(color, figure)
{
    this.color = color;
    this.figure = figure;
}

var FILES_BOARD = new Array(SQUARE_AMOUNT);
var RANKS_BOARD = new Array(SQUARE_AMOUNT);

function getSquare(file, rank)
{
    return ((21 + (file)) + ((rank) * 10));
}


