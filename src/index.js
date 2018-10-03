module.exports = function solveSudoku(matrix) {
  const solvedMatrix = matrix;
  
  const validateRow = (r, c) => {
    const value = solvedMatrix[r][c];
    for (let col = 0; col < 9; col++) {
      if (col != c && solvedMatrix[r][col] == value) {
        return false;
      }
    }
    return true;
  };
  
  const validateColumn = (r, c) => {
    const value = solvedMatrix[r][c];
    for (let row = 0; row < 9; row++) {
      if (row != r && solvedMatrix[row][c] == value) {
        return false;
      }
    }
    return true;
  };
  
  const validateQuadr = (r, c) => {
    const value = solvedMatrix[r][c];
    const boxRow = Math.floor(r / 3);
    const boxCol = Math.floor(c / 3);

    for (let row = boxRow * 3; row < boxRow * 3 + 3; row++) {
      for (let col = boxCol * 3; col < boxCol * 3 + 3; col++) {
        if (row != r && col != c && solvedMatrix[row][col] == value) {
          return false;
        }
      }
    }
    return true;
  };

  const backtrack = (r, c) => {
    c++;
    if (c > 8) {
        c = 0;
        r++;
        if (r > 8) {
          return true;
        }
    }

    if (solvedMatrix[r][c] != 0) {
      if (!(validateRow(r, c) && validateColumn(r, c) && validateQuadr(r, c))){
        return false;
      }
      return backtrack(r, c);
    } else { 
      for (let x = 1; x < 10; x++) {
        solvedMatrix[r][c] = x;
        if (validateRow(r, c) && validateColumn(r, c) && validateQuadr(r, c)){
          if (backtrack(r, c)) {
            return true;
          }
        }
      }
      solvedMatrix[r][c] = 0;
      return false;
    }
  };

  const solve = () => {	
	  for(let r = 0; r < 9; r++){
		  for(let c = 0; c < 9; c++){
			  if (solvedMatrix[r][c] != 0 && !(validateRow(r, c) && validateColumn(r, c) && validateQuadr(r, c))){
    			return false;
		  	}
		  }
	  }
    return backtrack(0, -1);
  };

return solve() ? solvedMatrix : "Error or no solution";
}