type Task = () => Promise<unknown>;

export class RequestQueue {
  private queue: Task[] = [];
  private isProcessing = false;

  public addTask(task: Task) {
    this.queue.push(task);
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing) return;

    this.isProcessing = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      console.log('Task started');
      console.time('Task processed');
      if (task) {
        try {
          await task();
        } catch (error) {
          console.error('Error processing task:', error);
        }
      }
      console.timeEnd('Task processed');
      // Add a delay between tasks to avoid overwhelming the server
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    this.isProcessing = false;
  }
}
