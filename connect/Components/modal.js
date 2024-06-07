import close from "@/public/images/close.png";
import Image from "next/image";

function Modal({ isOpen, onClose, children }) {
  return isOpen ? (
    <>
      <dialog className="fixed left-0 z-11 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
        <div className="bg-white m-auto p-8">
          <div className="flex flex-col items-center">
            <div className="w-[100%]">
              <div className="flex flex-col items-end">
                <button type="button" onClick={onClose}>
                  <Image
                    src={close}
                    width={15}
                    alt="close"
                    className="bg-white"
                  />
                </button>
              </div>
            </div>
            <br />
            <div>{children}</div>
          </div>
        </div>
      </dialog>
    </>
  ) : (
    <></>
  );
}

export default Modal;
