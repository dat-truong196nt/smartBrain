import React from "react";
import 'tachyons'

const Ranking = ({username, entries}) => {
	return (
		<p className="f1 light-yellow" style={{display: 'flex', justifyContent: 'center'}}>{`${username}, your currently enpoint is ${entries}`}</p>
	);
}

export default Ranking;