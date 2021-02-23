import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chart } from "react-google-charts";

const useStyles = makeStyles((theme) => ({
}));


const OrgChart = (props) => {
    const classes = useStyles();

    return (
        <Chart
            width={'100%'}
            height={1000} // <- not sure what height does...
            chartType="OrgChart"
            loader={<div>Loading Chart</div>}
            data={[
                ['Name', 'Manager', 'ToolTip'],
                [
                    {
                        v: 'Mike',
                        f: 'Mike <div style="color:red; font-style:italic">President</div>',
                    },
                    '',
                    'The President',
                ],
                [
                    // in the first {}, put 1) the node's ID
                    //                      2) the information inside of it
                    {
                        v: 'Jim',
                        f:
                            'Jim <div style="color:red; font-style:italic">Vice President</div>',
                    },
                    // 'Mike' is the ID of Jim's manager
                    'Mike',

                    // 'VP' is the ToolTip (IE, it's useless!)
                    'VP',
                ],
            ]}
            options={{
                allowHtml: true,
                allowCollapse: true
            }}
            rootProps={{ 'data-testid': '1' }}
        />
    );
};

export default OrgChart;
