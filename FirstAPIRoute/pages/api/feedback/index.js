// /api/feedback/

import fs from 'fs'
import path from 'path'

export function buildFeedbackPath(){
    return path.join(process.cwd(), 'data', 'feedback.json')
}

export function extractFeedback(filePath){
    let fileData
    fileData = fs.readFileSync(filePath)
    const data = JSON.parse(fileData)
    return data
}

function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email
        const feedbackText = req.body.text
        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText,
        }

        // store that in a database or in a file
        const filePath = buildFeedbackPath()
        try {
            const data = extractFeedback(filePath)
            
        } catch (error) {
            fileData = '[]'  // If the file doesn't exist or is empty, start with an empty array
        }
        
        

        // Add new feedback
        data.push(newFeedback)

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(data))

        res.status(201).json({ message: 'Success!', feedback: newFeedback })
    } else {
        const filePath = buildFeedbackPath()
        const data = extractFeedback(filePath)
        res.status(200).json({ feedback: data })
    }
}

export default handler
