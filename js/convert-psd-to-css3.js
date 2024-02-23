document.addEventListener('DOMContentLoaded', () => {
  const getInputValue = inputs => {
    return [...inputs].reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
  };
  const getDropValues = () => getInputValue(document.querySelectorAll('.from-ps input'));
  const getCssValues = () => getInputValue(document.querySelectorAll('.css3-box-shadow input'));

  const convertToCss = values => {
    const { red, green, blue, opacity, angle, distance, spread, size } = values;

    const angInRadians = ((180 - angle) * Math.PI) / 180;
    const offsetY = Math.round(Math.sin(angInRadians) * distance);
    const offsetX = Math.round(Math.cos(angInRadians) * distance);
    const spreadRad = (size * spread) / 100;
    const blurRad = size - spreadRad;
    const cssOpacity = opacity / 100;
    const inset = document.querySelector('select[name="inset"]').value === 'yes' ? ' inset' : '';

    return { red, green, blue, offsetX, offsetY, blurRad, spreadRad, cssOpacity, inset };
  };

  const getDefaultPsValues = () => ({
    red: '0',
    green: '0',
    blue: '0',
    opacity: '75',
    angle: '120',
    distance: '5',
    spread: '0',
    size: '5',
  });

  const convertToPs = values => {
    if (!values) return getDefaultPsValues();

    const { offsetX, offsetY, blurRad, spreadRad, cssOpacity } = values;

    const red = 0;
    const green = 0;
    const blue = 0;
    const opacity = cssOpacity * 100;
    const distance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
    const angle = Math.atan(parseInt(offsetY) / parseInt(offsetX));
    const spread = (spreadRad / (spreadRad + blurRad)) * 100;
    const size = parseInt(spreadRad) + parseInt(blurRad);

    return { red, green, blue, opacity, angle, distance, spread, size };
  };

  const convertToSyntax = values => {
    const { offsetX, offsetY, blurRad, spreadRad, red, green, blue, cssOpacity, inset } = values;
    const boxShadow = `${offsetX}px ${offsetY}px ${blurRad}px ${spreadRad}px rgba(${red}, ${green}, ${blue}, ${cssOpacity})${inset}`;
    const textShadow = `${offsetX}px ${offsetY}px ${blurRad}px rgba(${red}, ${green}, ${blue}, ${cssOpacity})`;

    return { boxShadow, textShadow };
  };

  const displayInputs = (inputsEl, values) => {
    [...inputsEl].forEach(input => {
      if (values && input.name in values) {
        input.value = values[input.name];
      }
    });
  };

  const displayPreview = css => {
    const boxPreview = document.querySelector('.box-shadow-preview');
    const textPreview = document.querySelector('.text-shadow-preview');
    const codeBox = document.querySelector('.output code');

    if (!css) {
      boxPreview.style.boxShadow = '';
      textPreview.style.textShadow = '';
      codeBox.innerText = `boxShadow: offset-x offset-y blur-radius spread-radius rgba(0, 0, 0, opacity) inset;
textShadow: offset-x offset-y blur-radius rgba(0,0,0 opacity);`;
      return;
    }

    const { boxShadow, textShadow } = convertToSyntax(css);
    boxPreview.style.boxShadow = boxShadow;
    textPreview.style.textShadow = textShadow;
    codeBox.innerText = `boxShadow: ${boxShadow};
textShadow: ${textShadow};`;
  };

  const initEvent = () => {
    const btnClear = document.querySelector('.btn-clear');
    const btnDefault = document.querySelector('.set-ps-default');
    const btnToCss = document.querySelector('.generate-css');
    const btnToPsd = document.querySelector('.generate-ps');
    const formPs = document.querySelector('form.from-ps');
    const formCss = document.querySelector('form.css3-box-shadow');
    const inputsPs = formPs.querySelectorAll('input');
    const inputsCss = formCss.querySelectorAll('input');

    btnClear.addEventListener('click', () => {
      formPs.reset();
      formCss.reset();
      displayPreview();
    });

    btnDefault.addEventListener('click', () => {
      const ps = convertToPs();
      const css = convertToCss(ps);
      displayInputs(inputsPs, ps);
      displayInputs(inputsCss, css);
      displayPreview(css);
    });

    btnToCss.addEventListener('click', () => {
      const inputValue = getDropValues();
      const css = convertToCss(inputValue);
      displayInputs(inputsCss, css);
      displayPreview(css);
    });

    btnToPsd.addEventListener('click', () => {
      const inputValue = getCssValues();
      const ps = convertToPs(inputValue);
      const css = convertToCss(ps);
      displayInputs(inputsPs, ps);
      displayPreview(css);
    });
  };

  initEvent();
  displayPreview();
});
