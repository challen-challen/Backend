
// getReducedCarbon 은 절약 시간/대상으로 탄소 저감량을 계산하여 반환하는 컨트롤러다.
export const getReducedCarbon = async (req, res, next) => {
    try {
        const {
            query : {category, plan}
        } = req;

        if (category == "" || plan == "") {
            return res.status(400).send({
                 err: "category or plan is null" 
                });
        }
        let carbon = await getCarbonAmount(category, plan);
        if (category == "electricity" || category == "airCondition") {
            const {
                query: {sparedTime}
            } = req;
            if (!sparedTime) {
                return res.status(400).send({
                    err: "sparedTime is null" 
                });
            }
            carbon *= sparedTime;
        }
        
        return res.status(200).json({ 
            success: true, 
            reducedCarcon : carbon 
        });
    } catch(error) {
        next(error);
    }
}

// getCarbonAmount 는 실천 방안 별 탄소 저감량을 반환하는 함수다.
const getCarbonAmount = async (category, plan) => {
    // 실천 방안 별 탄소 저감량(mg)
    // electricity, airCondition 은 1분당 저감량
    // traffic, resource는 건당 저감량
    const carbonObj = {
        "resource": {
            "hanky": 28767,
            "tumbler": 9589,
            "basket": 6849,
            "recycle": 241096,
            "water": 13151   
        }, 
        "traffic": {
            "bicycle": 482692,
            "publicTransportation": 9026923,
        },
        "electricity": {
            "tv": 936,
            "washer": 1787,
            "computer": 1839,
            "cooker": 1127,
            "microwave": 7353
        },
        "airCondition": {
            "aircon": 12422,
            "fan": 362,
            "boiler": 54811,
            "electricBlanket": 1155
        }
    }
    return carbonObj[category][plan];
}