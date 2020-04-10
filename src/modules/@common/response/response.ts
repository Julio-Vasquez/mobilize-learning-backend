export class Response {
  private msg: string;
  private state: any; //error, state

  public status(state: any) {
    this.msg = undefined;
    this.state = state;
    return this;
  }

  public message(type?: string) {
    this.msg = type;
    return this;
  }

  public payload(data?: any) {
    return {
      ...this.state,
      message: this.msg,
      payload: data,
    };
  }
}
