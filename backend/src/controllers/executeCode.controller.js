
export const executeCode = async (req, res) =>{
    try {
        const {problemId, language_id, source_code, stdin, expected_outputs } = req.body;

        // validate data
        if(!Array.isArray(stdin) || !Array.isArray(expected_outputs) || stdin.length===0 || stdin.length!==expected_outputs.length){
            return res.status(400).json({
                message: "Invalid data"
            });
        }

        // prepare submissions for each test cases:
        const submissions = stdin.map((input)=>({
            source_code: source_code,
            language_id: language_id,
            stdin: input,
            expected_output: expected_outputs,            
        }));

    } catch (error) {
        
    }
};