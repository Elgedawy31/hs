// Helper function to convert seconds to hours
export const secondsToHours = (seconds) => {
  if (!seconds) return "0";
  return (seconds / 3600).toFixed(2);
};

export const getSenderName = (from) => {
  // console.log(from);
  const match = from.match(/^(?:"([^"]+?)"\s)?<?([^>]+?)>?$/);
  if (match) {
    return {
      name: match[1],
      email: match[2],
    };
  }
  return {
    name: "UNKNOWN",
    email: "UNKNOWN",
  };
};

export const parseRecipients = (args) => {
  const arr = args.split(",").map((arg) => {
    arg = arg.trim();
    return getSenderName(arg);
  });
  return arr;
};


export class EventSourceWithAuth {
  constructor(url, options = {}) {
      this.options = options;
      this.url = url;
      this.eventListeners = {};
      this.readyState = 0; // 0-connecting, 1-open, 2-closed
  }

  async connect() {
      this.readyState = 0;
      try {
          const response = await fetch(this.url, {
              ...this.options,
              method: 'GET',
              keepalive: true,
              cache: "no-store"
          });

          if (!response.ok) {
              const result = await response.json();
              throw new Error(`HTTP error! status: ${response.status}, message: ${result.message}`);
          }

          this.readyState = 1;
          this.dispatchEvent({ type: 'open' });

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          const processStream = async ({ done, value }) => {
              if (done) {
                  this.readyState = 2;
                  this.dispatchEvent({ type: 'close' });
                  return;
              }

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n\n');
              buffer = lines.pop();

              for (const line of lines) {
                  if (line.trim() === '') continue;
                  this.processEvent(line);
              }

              const nextChunk = await reader.read();
              await processStream(nextChunk);
          };

          const firstChunk = await reader.read();
          await processStream(firstChunk);
      } catch (error) {
          this.readyState = 2;
          this.dispatchEvent({ type: 'error', data: error });
          // Reconnect after a delay
          setTimeout(() => this.connect(), 3000);
      }
  }

  processEvent(eventText) {
      const lines = eventText.split('\n');
      let eventType = 'message';
      let data = '';
      let id = null;

      for (const line of lines) {
          if (line.startsWith('event:')) {
              eventType = line.slice(6).trim();
          } else if (line.startsWith('data:')) {
              data += line.slice(5).trim() + '\n';
          } else if (line.startsWith('id:')) {
              id = line.slice(3).trim();
          }
      }

      data = data.slice(0, -1); // remove the last newline

      const event = {
          type: eventType,
          data: data,
          id: id
      };
      this.dispatchEvent(event);
  }

  addEventListener(type, callback) {
      if (!this.eventListeners[type]) {
          this.eventListeners[type] = [];
      }
      this.eventListeners[type].push(callback);
  }

  removeEventListener(type, callback) {
      if (this.eventListeners[type]) {
          this.eventListeners[type] = this.eventListeners[type].filter(cb => cb !== callback);
      }
  }

  dispatchEvent(event) {
      const callbacks = this.eventListeners[event.type];
      if (callbacks) {
          callbacks.forEach(callback => callback(event));
      }
  }

  close() {
      this.readyState = 2;
  }
}
