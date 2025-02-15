import { checkNullOrEmpty } from "../../utils/utils"

const NoRecordFound = ({ message = '' }: { message?: string }) => {
    return (
        <div className="text-center text-white">
            {checkNullOrEmpty(message) ? 'No data available' : message}
        </div>
    )
}

export default NoRecordFound