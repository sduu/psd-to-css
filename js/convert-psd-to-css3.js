document.addEventListener('DOMContentLoaded', () => {
  const doCSSMaths = () => {
    const getValue = name => document.querySelector(`input[name="${name}"]`).value;
    const opacity = getValue('opacity');
    const ang = getValue('angle');
    const dist = getValue('distance');
    const spread = getValue('spread');
    const size = getValue('size');
    const r = getValue('red');
    const g = getValue('green');
    const b = getValue('blue');
    const ins = document.querySelector('select[name="inset"]').value;

    const cssopacity = opacity / 100;
    document.querySelector('input[name="css-opacity"]').value = cssopacity;
    document.querySelector('.output .css-opacity').textContent = cssopacity;

    const angInRadians = ((180 - ang) * Math.PI) / 180;

    const offsety = Math.round(Math.sin(angInRadians) * dist);
    document.querySelector('input[name="offset-y"]').value = offsety;
    document.querySelector('.output .offset-y').textContent = offsety;

    const offsetx = Math.round(Math.cos(angInRadians) * dist);
    document.querySelector('input[name="offset-x"]').value = offsetx;
    document.querySelector('.output .offset-x').textContent = offsetx;

    const spreadrad = (size * spread) / 100;
    document.querySelector('input[name="spreadrad"]').value = spreadrad;
    document.querySelector('.output .spread-radius').textContent = spreadrad;

    const blurrad = size - spreadrad;
    document.querySelector('input[name="blur-radius"]').value = blurrad;
    document.querySelector('.output .blur-radius').textContent = blurrad;

    document.querySelector('.output .r').textContent = r;
    document.querySelector('.output .g').textContent = g;
    document.querySelector('.output .b').textContent = b;

    if (ins === 'Yes') {
      document.querySelector('.output .css-inset').textContent = ' inset';
      document.querySelector('.output .css-inset').style.display = 'inline';
    } else {
      document.querySelector('.output .css-inset').style.display = 'none';
    }

    updatePreview();
  };

  const updatePreview = () => {
    const offsetx = document.querySelector('input[name="offset-x"]').value;
    const offsety = document.querySelector('input[name="offset-y"]').value;
    const blurrad = document.querySelector('input[name="blur-radius"]').value;
    const spreadrad = document.querySelector('input[name="spreadrad"]').value;
    const cssopacity = document.querySelector('input[name="css-opacity"]').value;
    const r = document.querySelector('input[name="red"]').value;
    const g = document.querySelector('input[name="green"]').value;
    const b = document.querySelector('input[name="blue"]').value;
    const ins = document.querySelector('select[name="inset"]').value;

    let boxshadowval;
    if (ins === 'Yes') {
      boxshadowval = `${offsetx}px ${offsety}px ${blurrad}px ${spreadrad}px rgba(${r}, ${g}, ${b}, ${cssopacity}) inset`;
    } else {
      boxshadowval = `${offsetx}px ${offsety}px ${blurrad}px ${spreadrad}px rgba(${r}, ${g}, ${b}, ${cssopacity})`;
    }

    document.querySelector('.box-shadow-preview').style.boxShadow = boxshadowval;

    const textshadowval = `${offsetx}px ${offsety}px ${blurrad}px rgba(${r}, ${g}, ${b}, ${cssopacity})`;
    document.querySelector('.text-shadow-preview').style.textShadow = textshadowval;
  };

  const doPSMaths = () => {
    const offsetx = document.querySelector('input[name="offset-x"]').value;
    const offsety = document.querySelector('input[name="offset-y"]').value;
    const blurrad = document.querySelector('input[name="blur-radius"]').value;
    const spreadrad = document.querySelector('input[name="spreadrad"]').value;
    const cssopacity = document.querySelector('input[name="css-opacity"]').value;

    const opacity = cssopacity * 100;
    document.querySelector('input[name="opacity"]').value = opacity;

    const dist = Math.sqrt(Math.pow(offsetx, 2) + Math.pow(offsety, 2));
    document.querySelector('input[name="distance"]').value = dist;

    const ang = Math.atan(offsety / offsetx);
    document.querySelector('input[name="angle"]').value = ang;

    const spread = (spreadrad / (spreadrad + blurrad)) * 100;
    document.querySelector('input[name="spread"]').value = spread;

    const size = parseInt(spreadrad) + parseInt(blurrad);
    document.querySelector('input[name="size"]').value = size;
  };

  const doCodes = () => {
    const inset = document.querySelector('select[name="inset"]').value;
    const offsetx = document.querySelector('input[name="offset-x"]').value;
    const offsety = document.querySelector('input[name="offset-y"]').value;
    const blurrad = document.querySelector('input[name="blur-radius"]').value;
    const spreadrad = document.querySelector('input[name="spread"]').value;
    const r = document.querySelector('input[name="red"]').value;
    const g = document.querySelector('input[name="green"]').value;
    const b = document.querySelector('input[name="blue"]').value;
    const cssopacity = document.querySelector('input[name="css-opacity"]').value;
    document.querySelector('.output .offset-x').textContent = offsetx;
    document.querySelector('.output .offset-y').textContent = offsety;
    document.querySelector('.output .blur-radius').textContent = blurrad;
    document.querySelector('.output .spread-radius').textContent = spreadrad;
    document.querySelector('.output .r').textContent = r;
    document.querySelector('.output .g').textContent = g;
    document.querySelector('.output .b').textContent = b;
    document.querySelector('.output .css-opacity').textContent = cssopacity;
    if (inset === 'Yes') {
      document.querySelector('.output .css-inset').textContent = ' inset';
      document.querySelector('.output .css-inset').style.display = 'inline';
    } else {
      document.querySelector('.output .css-inset').style.display = 'none';
    }
  };

  const attachEventListeners = () => {
    const generateCSSButton = document.querySelector('a.generate-css');
    const generatePSButton = document.querySelector('a.generate-ps');
    const setPSDefaultButton = document.querySelector('a.set-ps-default');
    const clearButton = document.querySelector('a.clear-btn');
    const watchInputs = document.querySelectorAll('.watch');

    generateCSSButton.addEventListener('click', event => {
      event.preventDefault();
      doCSSMaths();
      document.querySelector('.output .syntax').style.display = 'none';
      document.querySelector('.output .generated').style.display = 'block';
    });

    generatePSButton.addEventListener('click', event => {
      event.preventDefault();
      doPSMaths();
    });

    setPSDefaultButton.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('.output .generated').style.display = 'none';
      document.querySelector('.output .syntax').style.display = 'block';
      const defaultValues = {
        red: '0',
        green: '0',
        blue: '0',
        opacity: '75',
        angle: '120',
        distance: '5',
        spread: '0',
        size: '5',
      };
      for (const [key, value] of Object.entries(defaultValues)) {
        document.querySelector(`input[name="${key}"]`).value = value;
      }
      doCSSMaths();
      document.querySelector('.output .syntax').style.display = 'none';
      document.querySelector('.output .generated').style.display = 'block';
    });

    clearButton.addEventListener('click', event => {
      event.preventDefault();
      document.querySelector('form.from-ps').reset();
      document.querySelector('form.css3-box-shadow').reset();
      document.querySelector('.output .generated').style.display = 'none';
      document.querySelector('.output .syntax').style.display = 'block';
    });

    watchInputs.forEach(input => {
      input.addEventListener('change', () => {
        doCodes();
        updatePreview();
      });
    });
  };

  attachEventListeners();
});
