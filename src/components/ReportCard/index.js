const ReportCard = ({ date }) => {
  return (
    <>
      <div className="reportcard">
        <div className="reportcard__wrapper">
          <span className="reportcard__wrapper--heading">{date}</span>
          <div className="reportcard__content">
            <div className="reportcard__content--single d-flex justify-content-between align-items-center">
              <div className="reportcard__content--left">Total Order:</div>
              <div className="reportcard__content--right">12,403</div>
            </div>
            <div className="reportcard__content--single d-flex justify-content-between align-items-center">
              <div className="reportcard__content--left">Completed Order:</div>
              <div className="reportcard__content--right">12,303</div>
            </div>

            <div className="reportcard__content--single d-flex justify-content-between align-items-center">
              <div className="reportcard__content--left">Total Revenue:</div>
              <div className="reportcard__content--right">24,000</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCard;
