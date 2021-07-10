/**
 * Page that explains which data is missing
 * @param {*} props
 */
export default function NoDataAvailable(props){
	// Can / should we open this whenever a backend request fails?
	// Sorry! There is no information in the backend for RATINGS over TODAY/ALL TIME/ YESTERDAY
	return (<div>
		<p>{props.message}</p>
	</div>);

}