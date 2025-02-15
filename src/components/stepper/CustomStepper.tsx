import { Stepper } from "@mantine/core";

const CustomStepper = ({ steps, activeStep, setActiveStep, highestStepVisited, onComplete }: any) => {
    const shouldAllowSelectStep = (step: any) => highestStepVisited >= step && activeStep !== step;

    return (
        <Stepper
            active={activeStep}
            onStepClick={setActiveStep}
            allowNextStepsSelect={false}
            color="#A768FD"
            contentPadding={20}
            wrap={false}
            size={window.innerWidth <= 768 ? "sm" : "xl"}
            styles={{
                step: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                stepIcon: {
                    marginBottom: '8px',
                    width: '30px',
                    height: '30px',
                    '@media (max-width: 768px)': {
                        width: '10px',
                        height: '10px',
                    },
                },
                stepLabel: {
                    // width: "80px", 
                    marginTop: '-10px',
                    textAlign: 'center',
                    fontSize: '14px',
                    '@media (max-width: 768px)': {
                        width: "60px",
                        display: "flex",
                        gap: "2rem",
                        fontSize: '5px',
                    },
                },
                stepBody: {
                    // width: "80%",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginLeft: "-75px",
                },
                separator: {
                    width: "30px",
                    height: '2px',
                    marginLeft: "-24px",
                    marginBottom: "35px",

                    '@media (max-width: 768px)': {
                        width: "50px",
                        marginLeft: "-16px",
                        minWidth: '30px',

                    },
                },
                stepWrapper: {
                    // width: "80px",
                    marginLeft: "-42px",
                    marginBottom: "20px",
                    '@media (max-width: 768px)': {
                        marginLeft: "-30px",
                        marginBottom: "16px",
                    },
                },
            }
            }
        >
            {steps?.map((step: any, index: any) => (
                <Stepper.Step
                    key={index}
                    label={
                        <div
                            className="justify-start items-start text-center sm:ml-5 "
                            style={{
                                color: activeStep <= index
                                    ? 'white'
                                    : '#A768FD',
                                width: "15px",
                                height: "20px",
                                textAlign: "center",
                                marginLeft: window.innerWidth <= 768 ? "20px" : "0px",
                                fontSize: window.innerWidth <= 768 ? "8.6px" : "inherit",
                            }}
                        >
                            {step.label}
                        </div>
                    }
                    // description={step.description}
                    allowStepSelect={shouldAllowSelectStep(index)}
                >
                    {step.content}
                </Stepper.Step >
            ))
            }
            <Stepper.Completed>
                {onComplete ? onComplete() : 'All steps completed!'}
            </Stepper.Completed>
        </Stepper >
    );
};

export default CustomStepper;
