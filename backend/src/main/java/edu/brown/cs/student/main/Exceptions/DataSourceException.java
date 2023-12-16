package edu.brown.cs.student.main.Exceptions;

public class DataSourceException extends Exception {
  private final Throwable cause;

  public DataSourceException(String message) {
    super(message);
    this.cause = null;
  }

  public DataSourceException(String message, Throwable cause) {
    super(message);
    this.cause = cause;
  }
}
