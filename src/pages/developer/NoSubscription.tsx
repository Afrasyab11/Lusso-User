import "./dev.scss";
const NoSubscription = () => {
    return (
        <div className="flex flex-col justify-center items-center" style={{height:'80vh'}}>
            <div>
                <span className="text-white text-[30px] font-bold">
                    No Products to Show here.
                </span>
            </div>
            <div>
                <button
                    type="submit"
                    className="ac-login-btn mt-10"
                    style={{
                      borderRadius:50,
                      border: '1px solid #A768FD',
                      background: 'linear-gradient(90deg, #4B03CE 0%, #F572B6 100%)',
                      textTransform:'capitalize'
                    }}
                  >
                    Purchase subscription
                  </button>
            </div>
        </div>
    )
}

export default NoSubscription;