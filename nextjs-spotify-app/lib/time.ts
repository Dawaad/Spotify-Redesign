export function convertMilliseconds(ms: number): string {
    var hours = Math.floor(ms / 3600000);
    var minutes = Math.floor((ms % 3600000) / 60000);
    var seconds = Math.floor(((ms % 360000) % 60000) / 1000);
  
    if (hours > 0) {
      return (
        hours +
        ":" +
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0")
      );
    } else {
      return minutes + ":" + seconds.toString().padStart(2, "0");
    }
  }