import './style.css'

document.querySelector('#app').innerHTML = `
  <main class="shell">
    <header class="topbar">
      <a class="brand" href="#top" aria-label="Nest home"><span class="brand-mark">↗</span><span>QUDUS</span></a>
      <span class="eyebrow">Personal finance / 01</span>
    </header>
    <section class="intro" id="top">
      <div><p class="kicker">The quiet power of time</p><h1>Watch your money<br><em>take root.</em></h1></div>
      <p class="intro-copy">A simple view of what your money could become when growth gets room to work.</p>
    </section>
    <section class="calculator" aria-label="Compound interest calculator">
      <form class="form-panel" id="calculator-form">
        <div class="section-heading"><span class="section-number">01</span><h2>Set your yearly contribution</h2></div>
        <label class="field"><span>Currency</span><select id="currency" name="currency"><option value="USD">US dollar (USD)</option><option value="NGN">Nigerian naira (NGN)</option></select></label>
        <label class="field"><span>Contribution at the beginning of each year</span><div class="input-wrap"><span class="prefix" id="currency-symbol">$</span><input id="amount" name="amount" type="number" min="0" step="100" value="100000" required></div></label>
        <label class="field"><span>Annual interest rate</span><div class="input-wrap"><input id="rate" name="rate" type="number" min="0" step="0.1" value="7" required><span class="suffix">%</span></div></label>
        <label class="field"><span>Time horizon</span><div class="input-wrap"><input id="years" name="years" type="number" min="1" step="1" value="10" required><span class="suffix">years</span></div></label>
        <button type="submit">Calculate growth <span aria-hidden="true">↗</span></button>
        <p class="formula-note">A = P × [((1 + r)<sup>t</sup> − 1) / r] × (1 + r)</p>
      </form>
      <div class="result-panel" aria-live="polite">
        <div class="result-topline"><span>Projected value</span><span class="live-dot">● Live</span></div>
        <p class="result-value" id="result">$19,671</p>
        <p class="result-caption">after <strong id="result-years">10 years</strong> of beginning-of-year deposits</p>
        <div class="growth-row"><span>Total growth</span><strong id="growth">+$9,671</strong></div>
        <div class="bar" aria-hidden="true"><span id="growth-bar"></span></div>
        <div class="legend"><span><i class="legend-start"></i>Total contributions</span><span><i class="legend-growth"></i>Growth</span></div>
        <p class="disclaimer">This estimate adds each contribution at the beginning of the year, then compounds it at a constant annual rate.</p>
      </div>
    </section>
    <footer><span>Small inputs. Long horizons.</span><span>© 2026 Nest</span></footer>
  </main>
`

const form = document.querySelector('#calculator-form')
const currencyInput = document.querySelector('#currency')
const amountInput = document.querySelector('#amount')
const rateInput = document.querySelector('#rate')
const yearsInput = document.querySelector('#years')
const result = document.querySelector('#result')
const resultYears = document.querySelector('#result-years')
const growth = document.querySelector('#growth')
const growthBar = document.querySelector('#growth-bar')
const currencySymbol = document.querySelector('#currency-symbol')

const currencySettings = {
  USD: { locale: 'en-US', symbol: '$' },
  NGN: { locale: 'en-NG', symbol: '₦' },
}

function calculate() {
  const amount = Number(amountInput.value)
  const rate = Number(rateInput.value) / 100
  const years = Number(yearsInput.value)
  const projected = rate === 0
    ? amount * years
    : amount * (((1 + rate) ** years - 1) / rate) * (1 + rate)
  const totalContributions = amount * years
  const earned = projected - totalContributions
  const growthPercent = Math.min((earned / projected) * 100, 100)
  const selectedCurrency = currencySettings[currencyInput.value]
  const formatter = new Intl.NumberFormat(selectedCurrency.locale, { style: 'currency', currency: currencyInput.value, maximumFractionDigits: 0 })
  currencySymbol.textContent = selectedCurrency.symbol
  result.textContent = formatter.format(projected)
  resultYears.textContent = `${years} ${years === 1 ? 'year' : 'years'}`
  growth.textContent = `+${formatter.format(earned)}`
  growthBar.style.width = `${growthPercent}%`
}

form.addEventListener('submit', (event) => { event.preventDefault(); calculate() })
form.addEventListener('input', calculate)
calculate()
