interface ErrorMessageProps {
  message: string;
  logError?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  logError,
}) => {
  if (logError) {
    console.error("Logged error:", logError);
  }

  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
};
