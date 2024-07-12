import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as UserProfileDialog from "./components/user-profile-dialog";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const records = [
  {
    icon: "i-hugeicons:fire",
    value: "1000kcal",
  },
  {
    icon: "i-hugeicons:running-shoes",
    value: "10348",
  },
  {
    icon: "i-hugeicons:cardiogram-02",
    value: "12m",
  },
];

const CARD_TRANSITION_DURATION = 0.2;

function App() {
  const navigate = useNavigate();
  const ids = Array.from({ length: 4 }, (_, i) => i).map(String);
  const lastFocus = useRef<HTMLElement>();

  const handleSelect = (id: string) => {
    if (lastFocus.current) lastFocus.current.blur();
    lastFocus.current = document.getElementById(id) as HTMLElement;
  };

  const handleExit = () => {
    navigate(".");
    if (lastFocus.current) lastFocus.current.focus();
  };

  useEffect(() =>
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") handleExit();
    })
  );

  return (
    <div className="relative vstack overflow-hidden bg-white h-full max-h-4xl w-full max-w-md">
      <nav className="h-28 vstack justify-end px-4 pb-6 pt-5">
        <h2 className="text-3xl">Fellows</h2>
      </nav>
      <div className="vstack">
        {ids.map((id) => (
          <Link
            key={id}
            to={id}
            onClick={() => handleSelect(id)}
            className="outline-none group"
          >
            <motion.div
              id={id}
              transition={{ duration: CARD_TRANSITION_DURATION, type: "tween" }}
              layoutId={id}
              className="px-4 bg-white group-hover:bg-gray-1 group-active:bg-gray-1 group-focus:bg-gray-1"
            >
              <div className="hstack gap-2 h-20 items-center">
                <motion.img
                  layoutId={`${id}-avatar`}
                  src="/avatar.svg"
                  alt="avatar"
                  className="rounded-full w-12 h-12"
                />
                <motion.h3 layoutId={`${id}-title`}>George McWilliam</motion.h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      <Routes>
        <Route
          path="/:id"
          element={
            <AnimatePresence initial={false}>
              <UserProfileDialog.Content
                records={records}
                onClose={handleExit}
              />
            </AnimatePresence>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
