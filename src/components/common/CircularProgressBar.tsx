import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgressBar({ percentage }: { percentage: number }) {
    return (
        <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
                textColor: "white",
                textSize: "25px",
                pathColor: "#6AC92F",
                trailColor: "#A2A1B2"
            })} />
    )
}

export default CircularProgressBar