export default {
  async fetch(request) {
    const MAKE_WEBHOOK = 'https://hook.eu2.make.com/nd5dadhzm72tytag3j0yjm8s12wdvshp';
    
    if (request.method === 'POST') {
      const body = await request.json();
      
      // Handle Discord PING verification
      if (body.type === 1) {
        return new Response(JSON.stringify({ type: 1 }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      // Forward everything else to Make.com
      const makeResponse = await fetch(MAKE_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      // If Make.com responds, use that
      if (makeResponse.ok) {
        return makeResponse;
      }
      
      // Otherwise acknowledge the command
      return new Response(JSON.stringify({
        type: 4,
        data: { content: 'Processing your request...' }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('OK');
  }
}