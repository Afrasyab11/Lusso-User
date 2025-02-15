import { checkNullOrEmpty } from '../../utils/utils';

export const ProgressBarWithColors = ({
    progressList,
}: {
    progressList: any[];
}) => {
    console.log('ProgressBarWithColors', progressList);

    return (
        <div className="flex w-full h-6 bg-gray-300">
            {!checkNullOrEmpty(progressList) &&
                progressList.map((progress: any) => (
                    <div
                        className="tooltip capitalize font-bold text-white"
                        data-tip={(progress?.label ?? progress?.targetKey) + ': ' + (progress?.value ?? 0)}
                        style={{
                            width: `${progress?.percentage ?? 0}%`,
                        }}
                    >
                        <div
                            className="h-full"
                            style={{
                                width: `100%`,
                                background: progress?.color ?? '#ffff',
                            }}
                        />
                    </div>
                ))}
        </div>
    );
};

{
    /* <div className="tooltip" data-tip="hello">
      <button className="btn">Hover me</button>
  </div> */
}
