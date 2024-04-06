const BUTTON = (props) => {
  /*
    props = {
        text: string,
        onClick: function
        type: string,
        disabled: boolean
    }
    */
  return "disabled" in props ? (
    <button
      type={props.type}
      className="text-white bg-blue-700 cursor-not-allowed font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      // onClick={"onClick" in props ? props.onClick : (e) => e.preventDefault()}
      disabled
    >
      {props.text}
    </button>
  ) : (
    <button
      type={props.type}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      // onClick={"onClick" in props ? props.onClick : (e) => e.preventDefault()}
    >
      {props.text}
    </button>
  );
};

export default BUTTON;
