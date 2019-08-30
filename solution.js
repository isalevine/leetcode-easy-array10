// source: https://leetcode.com/explore/interview/card/top-interview-questions-easy/92/array/769/




// Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

// Each row must contain the digits 1-9 without repetition.
// Each column must contain the digits 1-9 without repetition.
// Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.

// [IMG] A partially filled sudoku which is valid.

// The Sudoku board could be partially filled, where empty cells are filled with the character '.'.

// Example 1:

// Input:
// [
//   ["5","3",".",".","7",".",".",".","."],
//   ["6",".",".","1","9","5",".",".","."],
//   [".","9","8",".",".",".",".","6","."],
//   ["8",".",".",".","6",".",".",".","3"],
//   ["4",".",".","8",".","3",".",".","1"],
//   ["7",".",".",".","2",".",".",".","6"],
//   [".","6",".",".",".",".","2","8","."],
//   [".",".",".","4","1","9",".",".","5"],
//   [".",".",".",".","8",".",".","7","9"]
// ]
// Output: true
// Example 2:

// Input:
// [
//   ["8","3",".",".","7",".",".",".","."],
//   ["6",".",".","1","9","5",".",".","."],
//   [".","9","8",".",".",".",".","6","."],
//   ["8",".",".",".","6",".",".",".","3"],
//   ["4",".",".","8",".","3",".",".","1"],
//   ["7",".",".",".","2",".",".",".","6"],
//   [".","6",".",".",".",".","2","8","."],
//   [".",".",".","4","1","9",".",".","5"],
//   [".",".",".",".","8",".",".","7","9"]
// ]
// Output: false
// Explanation: Same as Example 1, except with the 5 in the top left corner being 
//     modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
// Note:

// A Sudoku board (partially filled) could be valid but is not necessarily solvable.
// Only the filled cells need to be validated according to the mentioned rules.
// The given board contain only digits 1-9 and the character '.'.
// The given board size is always 9x9.





var isValidSudoku = function(board) {
    let rowResults = checkRows(board);
    let columnResults = checkColumns(board);
    let boxResults = checkBoxes(board);
    
    if (rowResults && columnResults && boxResults) {
        return true
    };
    
    return false
};



function checkRows(board) {
    for (i1 = 0; i1 < board.length; i1++) {
        let dict = {};
        let row = board[i1];
        
        for (i2 = 0; i2 < row.length; i2++) {  // check rows for duplicates
            let num = row[i2];
            if (dict[num]) {
                return false;
            } else if (num != ".") {
                dict[num] = true;
            };
        };
        
    };
    
    return true
} 


function checkColumns(board) {
    let columns = [];                               // columns is essentially the same as board, but rotated
    
    for (i1 = 0; i1 < board.length; i1++) {         // create array of columns
        let row = board[i1];
        
        for (i2 = 0; i2 < row.length; i2++) {
        
            if (columns[i2]) {
                let existingColumn = columns[i2];
                existingColumn.push(row[i2]);
            } else {
                let newColumn = [row[i2]];
                columns.push(newColumn);
            }
            
        };
        
    };
    
    return checkRows(columns);                      // reuse same row-checking from previous function
} 


function checkBoxes(board) {
    let boxes = [];
    
    for (i1 = 0; i1 < board.length; i1++) {
        let row = board[i1];
        
        // console.log(boxes)
        
        for (i2 = 0; i2 < row.length; i2 = i2 + 3) {    // i2 iterates as 0, 3, 6
            let rowSlice = row.slice(i2, i2 + 3);
            
            // console.log(rowSlice)
            
            if (i1 == 0 || i1 == 3 || i1 == 6) {        // create 9 total boxes
                let newBox = rowSlice;
                boxes.push(newBox);    

            } else {
                let boxIndex;
                if (i1 == 1 || i1 == 2) {
                    boxIndex = Math.floor(i2 / 3);      // boxes 0, 1, 2
                } else if (i1 == 4 || i1 == 5) {
                    boxIndex = Math.floor(i2 / 3) + 3;  // boxes 3, 4, 5
                } else if (i1 == 7 || i1 == 8) {
                    boxIndex = Math.floor(i2 / 3) + 6;  // boxes 6, 7, 8
                };
                
                let existingBox = boxes[boxIndex];
                boxes[boxIndex] = existingBox.concat(rowSlice);
            };   
            
        };
                
    };
    
    return checkRows(boxes);                            // reuse same row-checking from previous function 
}