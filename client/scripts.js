document.getElementById('submit').addEventListener('click', function() {
    const url = document.getElementById('url').value;  // Get the URL from input field

    // Call the Flask API to analyze the website
    fetch('http://localhost:5000/analyze', {  // Ensure the URL is correct for your Flask server
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ urls: [url] })  // Send the URL as an array
    })
    .then(response => response.json())
    .then(data => {
        // Generate HTML table to display the results
        let resultHTML = `
            <table class="min-w-full table-auto">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700">Parameter</th>
                        <th class="py-2 px-4 text-left text-sm font-semibold text-gray-700">Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                        <tr class="border-b">
                            <td class="py-2 px-4 text-sm text-gray-700">${item['Website URL']}</td>
                            <td class="py-2 px-4 text-sm text-gray-700">${item['Overall Score (100%)']}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        // Show the result
        document.getElementById('result').innerHTML = resultHTML;
    })
    .catch(error => {
        document.getElementById('result').innerHTML = "<p class='text-red-500'>An error occurred while fetching the data.</p>";
    });
});
