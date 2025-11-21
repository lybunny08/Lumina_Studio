/* eslint-disable react/prop-types */
function ReusableText({ children, className = "" }) {
  return (
    <p className={`uppercase text-[#6e6e6e] ${className}`}>
      ({children})
    </p>
  );
}

export default ReusableText;