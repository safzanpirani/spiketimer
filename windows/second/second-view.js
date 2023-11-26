import { SampleAppView } from '../sample-app-view.js'

export class SecondView extends SampleAppView {
  constructor() {
    super();

    this._eventsLog = document.getElementById('eventsLog');
    this._infoLog = document.getElementById('infoLog');
    this._copyEventsButton = document.getElementById('copyEvents');
    this._copyInfoButton = document.getElementById('copyInfo');
    this._hotkeyToggle = document.getElementById('hotkey-toggle');
    this._hotkeySecondScreen = document.getElementById('hotkey-second-screen');
    this._countdownTimerElem = document.getElementById('countdownTimer');
    this._timerInterval = null;
    this._copyEventsButton.addEventListener('click', e => this._copyEventsLog(e));
    this._copyInfoButton.addEventListener('click', e => this._copyInfoLog(e));
  }

  // -- Public --
  startCountdownTimer(duration) {
    if (this._timerInterval) {
      this.stopCountdownTimer();
    }
    let remainingTime = duration * 10; // Convert to 10th of a second for better precision
  
    this._countdownTimerElem.textContent = (remainingTime / 10).toFixed(1);
    this._countdownTimerElem.style.display = 'block';
  
    const timerInterval = setInterval(() => {
      remainingTime -= 1;
  
      this._countdownTimerElem.textContent = (remainingTime / 10).toFixed(1);
  
      if (remainingTime <= 70) {
        this._countdownTimerElem.style.color = 'red';
      }
      else
        this._countdownTimerElem.style.color = 'green';
  
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        this._countdownTimerElem.style.display = 'none'; // Hide the timer
      } 
    }, 100); // Update every 100ms
  }
  stopCountdownTimer() {
    if (this._timerInterval) {
      clearInterval(this._timerInterval);
      this._timerInterval = null;
      this._countdownTimerElem.style.display = 'none';
    }
  }
  // Add a line to the events log
  logEvent(string, isHighlight) {
    this._logLine(this._eventsLog, string, isHighlight);
  }

  // Add a line to the info updates log
  logInfoUpdate(string, isHighlight) {
    this._logLine(this._infoLog, string, isHighlight);
  }

  // Update toggle hotkey header
  updateToggleHotkey(hotkey) {
    this._hotkeyToggle.textContent = hotkey;
  }

  // Update second screen hotkey header
  updateSecondHotkey(hotkey) {
    this._hotkeySecondScreen.textContent = hotkey;
  }

  // -- Private --

  _copyEventsLog() {
    this._copyLog(this._eventsLog);
  }

  _copyInfoLog() {
    this._copyLog(this._infoLog);
  }

  // Copy text from log
  _copyLog(log) {
    // Get text from all span children
    const nodes = log.childNodes;

    let text = '';

    for (let node of nodes) {
      if (node.tagName === 'PRE') {
        text += node.innerText + "\n";
      }
    }

    overwolf.utils.placeOnClipboard(text);
  }

  // Add a line to a log
  _logLine(log, string, isHighlight) {
    const line = document.createElement('pre');

    // Check if scroll is near bottom
    const shouldAutoScroll =
      log.scrollTop + log.offsetHeight >= log.scrollHeight - 10;

    if (isHighlight) {
      line.className = 'highlight';
    }

    line.textContent = string;

    log.appendChild(line);

    if (shouldAutoScroll) {
      log.scrollTop = log.scrollHeight;
    }
  }
}
