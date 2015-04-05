function INIT_FilesRanksBoard() {
    for (var i = 0; i < SQUARE_AMOUNT; i++)
    {
        FILES_BOARD[i] = SQUARES.OFFBOARD;
        RANKS_BOARD[i] = SQUARES.OFFBOARD;
    }

    for (var r = RANKS.RANK_1; r <= RANKS.RANK_8; r++)
    {
        for (var f = FILES.FILE_A; f <= FILES.FILE_H; f++)
        {
            var sq = getSquare(f, r);
            FILES_BOARD[sq] = f;
            RANKS_BOARD[sq] = r;
        }
    }

    console.log("FILES_BOARD[0]: " + FILES_BOARD[0] + " RANKS_BOARD[0]: " + RANKS_BOARD[0]);
    console.log("FILES_BOARD[SQUARES.A1]: " + FILES_BOARD[SQUARES.A1] + " RANKS_BOARD[SQUARES.A1]: " + RANKS_BOARD[SQUARES.A1]);
    console.log("FILES_BOARD[SQUARES.E8]: " + FILES_BOARD[SQUARES.E8] + " RANKS_BOARD[SQUARES.E8]: " + RANKS_BOARD[SQUARES.E8]);
}

