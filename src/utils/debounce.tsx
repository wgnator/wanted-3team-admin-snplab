type Timer = number | undefined;

interface DebounceOption {
  callback: () => void;
  timeout?: number;
}

let timer: Timer = undefined;
let apiCallNumber = 0;

function debouunce({ callback, timeout = 500 }: DebounceOption) {
  const timerHandler = () => {
    callback();
    apiCallNumber = apiCallNumber + 1;
    console.log('Api call number :', apiCallNumber);
  };

  if (timer) clearTimeout(timer);
  timer = setTimeout(timerHandler, timeout);
}

export default debouunce;
