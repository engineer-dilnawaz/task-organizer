export const Filters = () => {
  return (
    <form className="filter">
      <input className="btn btn-square" type="reset" value="×" />
      <input
        className="btn btn-sm"
        type="radio"
        name="frameworks"
        aria-label="Completed"
      />
      <input
        className="btn btn-sm"
        type="radio"
        name="frameworks"
        aria-label="Incomplete"
      />
    </form>
  );
};
