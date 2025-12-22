import { X } from "lucide-react";

export const Filters = () => {
  return (
    <form>
      <input
        className="btn"
        type="checkbox"
        name="frameworks"
        aria-label="Svelte"
      />
      <input
        className="btn"
        type="checkbox"
        name="frameworks"
        aria-label="Vue"
      />
      <input
        className="btn"
        type="checkbox"
        name="frameworks"
        aria-label="React"
      />
      <button type="reset" className="btn btn-square">
        <X color="#ffffff" />
      </button>
    </form>
  );
};
