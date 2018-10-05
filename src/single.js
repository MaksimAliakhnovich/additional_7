function solveSudoku() {
  const matrix = [
    [0, 0, 0, 9, 3, 8, 0, 4, 0],
    [0, 0, 0, 7, 6, 0, 0, 0, 2],
    [7, 4, 0, 5, 0, 0, 0, 8, 0],
    [8, 0, 0, 6, 7, 5, 0, 1, 3],
    [0, 7, 0, 3, 0, 2, 8, 0, 0],
    [3, 2, 0, 0, 4, 0, 0, 0, 0],
    [0, 0, 0, 0, 5, 6, 3, 2, 0],
    [0, 5, 0, 4, 0, 0, 0, 0, 0],
    [1, 0, 6, 2, 0, 0, 0, 5, 0]
  ];

  const solvedMatrix = matrix;  
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const existVal = new Set();
  const cellIsEmpty = (x, y) => solvedMatrix[x][y] == 0;
  let emptyCell = 81;
  
  /* все числа, которые есть в ряду с проверяемой ячейкой */  
  const rowExistVal = x => {
    for (let row = x, col = 0; col < 9; col++) {
      if (!cellIsEmpty(row, col)) {
        existVal.add(solvedMatrix[row][col]);
      }
    }
  };
  
  /* все числа, которые есть в столбце с проверяемой ячейкой */ 
  const colExistVal = y => {
    for (let row = 0, col = y; row < 9; row++) {
      if (!cellIsEmpty(row, col)) {
        existVal.add(solvedMatrix[row][col]);
      }
    }
  };
  
  /* по текущей позиции ищем квадрат и берём все числа, которые есть в квадрате */
  const quadrExistVal = (xNumPos, yNumPos) => {
    let xQuadr = 0;
    let yQuadr = 0;
    
    if (xNumPos < 3 && yNumPos < 3) {
      xQuadr = 0;
      yQuadr = 0;
    } else if (xNumPos < 3 && 3 <= yNumPos && yNumPos < 6) {
      xQuadr = 0;
      yQuadr = 3;
    } else if (xNumPos < 3 && 6 <= yNumPos && yNumPos < 9) {
      xQuadr = 0;
      yQuadr = 6;
    } else if (3 <= xNumPos && xNumPos < 6 && yNumPos < 3) {
      xQuadr = 3;
      yQuadr = 0;
    } else if (3 <= xNumPos && xNumPos < 6 && 3 <= yNumPos && yNumPos < 6) {
      xQuadr = 3;
      yQuadr = 3;
    } else if (3 <= xNumPos && xNumPos < 6 && 6 <= yNumPos) {
      xQuadr = 3;
      yQuadr = 6;
    } else if (6 <= xNumPos && xNumPos < 9 && yNumPos < 3) {
      xQuadr = 6;
      yQuadr = 0;
    } else if (6 <= xNumPos && xNumPos < 9 && 3 <= yNumPos && yNumPos < 6) {
      xQuadr = 6;
      yQuadr = 3;
    } else if (6 <= xNumPos && xNumPos < 9 && 6 <= yNumPos) {
      xQuadr = 6;
      yQuadr = 6;
    }

    for (let row = xQuadr; row < xQuadr + 3; row++) {
      for (let col = yQuadr; col < yQuadr + 3; col++) {
        if (!cellIsEmpty(row, col)) {
          existVal.add(solvedMatrix[row][col]);
        }
      }
    }
  };

  /* выбираем числа строки, столбца и квадрата, если больше 1го - идём в след. ячейку,
  если одно, то записываем его в текущую ячейку */
  while (emptyCell != 0) {
    emptyCell = 81;
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (cellIsEmpty(x, y)) {
          quadrExistVal(x, y);
          rowExistVal(x);
          colExistVal(y);
          if (existVal.size == 8) {
              solvedMatrix[x][y] = numbers.filter(x => [...existVal].indexOf(x) == -1)[0];
              console.log(solvedMatrix);
              existVal.clear();
              emptyCell > 0 ? emptyCell-- : null;
            };
        } else {
          emptyCell > 0 ? emptyCell-- : null;
          existVal.clear();
        }
      }
    }
    console.log(emptyCell);
  }
  return solvedMatrix;
}