import clsx from "clsx";
import { type Variants, motion } from "framer-motion";
import { useParams } from "react-router-dom";

const CARD_TRANSITION_DURATION = 0.2;

const container: Variants = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
  hidden: {
    transition: { staggerChildren: 0.1 },
  },
};

const recordItem: Variants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, delay: i * 0.1 },
  }),
  hidden: { opacity: 0, y: 16, transition: { duration: 0.1 } },
};

const closeButton: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export function Records(props: { column: { icon: string; value: string }[] }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="flex justify-center gap-6"
    >
      {props.column.map(({ icon, value }, i) => (
        <motion.div
          custom={i}
          variants={recordItem}
          layout
          key={icon}
          className="vstack items-center gap-2 w-20"
        >
          <div className={clsx(icon, "font-300 w-6 h-6")} />
          <span className="text-sm">{value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

export function CloseButton(props: { onClick: () => void }) {
  return (
    <motion.button
      variants={closeButton}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0 }}
      onClick={props.onClick}
      layout
      type="button"
      className="bg-gray/16 absolute top-4 right-4 p-2 rounded-full"
    >
      <div className="i-hugeicons:cancel-01 w-6 h-6" />
    </motion.button>
  );
}

export function Content({
  records,
  onClose,
}: {
  records: { icon: string; value: string }[];
  onClose: () => void;
}) {
  const { id } = useParams();
  return (
    <div className="fixed inset-0 pointer-events-none grid place-items-center">
      <motion.div
        transition={{
          duration: CARD_TRANSITION_DURATION,
          when: "beforeChildren",
          delayChildren: CARD_TRANSITION_DURATION,
        }}
        layoutId={id}
        className="bg-white h-full flex vstack px-4 gap-8 py-18 w-full pointer-events-auto max-w-md max-h-4xl relative"
      >
        <motion.img
          layoutId={`${id}-avatar`}
          src="/avatar.svg"
          alt="avatar"
          className="rounded-full mx-auto w-24 h-24"
        />
        <motion.h3 layoutId={`${id}-title`} className="text-center text-3xl">
          George McWilliam
        </motion.h3>
        <Records column={records} />
        <CloseButton onClick={onClose} />
      </motion.div>
    </div>
  );
}
