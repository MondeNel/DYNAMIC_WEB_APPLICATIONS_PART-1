import { LitElement, html, css } from 'lit';

/**
 * TallyApp is a LitElement-based component for a tally counter application
 *
 * @element tally-app
 *
 */

class TallyApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      font-family: Arial
    }

    button {
      font-size: 20px;
      padding: 8px 16px;
      margin: 5px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

  `;

  /**
  * Constructs a TallyApp instance.
  */
  constructor() {
    super();

    /**
     * The current tally count.
     *
     * @type {number}
     * @default 0
     */
    this.count = 0;

    /**
     * The minimum allowable count.
     *
     * @type {number}
     * @default -5
     */
    this.minCount = -5;

    /**
     * The maximum allowable count.
     *
     * @type {number}
     * @default 5
     */
    this.maxCount = 5;

    /**
     * The state of the tally counter ('Normal', 'Minimum Reached', or 'Maximum Reached').
     *
     * @type {string}
     * @default 'Normal'
     */
    this.state = 'Normal';
  }

  /**
   * Increments the tally count by 1 if it's less than the maximum allowable count.
   * Updates the state and triggers a rendering update.
   */
  increment() {
    if (this.count < this.maxCount) {
      this.count++;
      this.checkState();
      this.requestUpdate();
    } else {
      this.state = 'Maximum Reached';
    }
  }

  /**
   * Decrements the tally count by 1 if it's greater than the minimum allowable count.
   * Updates the state and triggers a rendering update.
   */
  decrement() {
    if (this.count > this.minCount) {
      this.count--;
      this.checkState();
      this.requestUpdate();
    } else {
      this.state = 'Minimum Reached';
    }
  }

  /**
   * Checks the current tally count and updates the state accordingly.
   */
  checkState() {
    if (this.count === this.minCount) {
      this.state = 'Minimum Reached';
    } else if (this.count === this.maxCount) {
      this.state = 'Maximum Reached';
    } else {
      this.state = 'Normal';
    }
  }

  /**
   * Renders the TallyApp component with HTML and LitHTML templates.
   *
   * @returns {TemplateResult}
   */
  render() {
    return html`
      <h1>Tally Counter App</h1>
      <div>
        <button @click="${this.decrement}" ?disabled="${this.count === this.minCount}">-</button>
        <span class="count">${this.count}</span>
        <button @click="${this.increment}" ?disabled="${this.count === this.maxCount}">+</button>
      </div>
      <p>${this.state}</p>
    `;
  }
}

// Define the custom element.
window.customElements.define('tally-app', TallyApp);