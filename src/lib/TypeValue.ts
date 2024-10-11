export const kindName = (type: string) => {
  let str = "";
  switch (type) {
    case "00":
      str = "2D";
      break;
    case "10":
      str = "3D";
      break;
    case "20":
      str = "4D";
      break;
    case "30":
      str = "IMAX";
      break;
  }
  return str;
};

export const seatName = (name: string, line: string[], index: number) => {
  let count = 0;
  let str = "";
  for (let i = 0; i <= index; i++) {
    if (line[i] === "O") {
      count += 1;
    }
  }

  if (count > 0) {
    str = `${name}${count}`;
  }
  return str;
};
