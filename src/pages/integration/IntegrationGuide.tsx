export default function IntegrationGuide() {
  return (
    <div className="max-w-none prose prose-lg">
      <h1>IDENTITY VERIFICATION SERVICE RIVaaS</h1>

      <h1>Integration Manual</h1>

      <p>This document describes how to integrate with Innovatrics RIVaaS service.</p>

      <h1>Table of Contents</h1>

      <p>What is RIVaaS?.</p>

      <p>2 Prerequisites..</p>

      <p>3 How to integrate with RIVaaS. 3.1 Concept. 3.1.1 Redirect fl ow. 3.1.2 Iframe fl ow. 3.2 Integration steps. 5 3.2.1 Obtain JWT from Auth0. 5 3.2.2 Obtain session token from RIVaaS API. .7 3.2.3 Initialization of RIVaaS App... 8 Redirect fl ow.. 8 Iframe fl ow.. .8 3.2.4 User identity verifi cation. 9 3.2.5 Obtaining verifi cation result and data 10 Verifi cation result. 10 Redirect fl ow.. 10 Iframe fl ow.... 10 Webhook event API. 11 3.3 Error Handling. 13</p>

      <h1>InnovAtcIes</h1>

      <h1>1 What is RIVaaS?</h1>

      <p>Remote Identity Verifi cation as a Service (RIVaaS) is a service allowing web platforms to verify the identity of their users remotely without the need of complicated integration of Innovatrics' identity verifi cation toolkit - DOT. It is a web application that can be accessed either as a standalone web application (via redirect) or as an iframe.</p>

      <h1>2 Prerequisites</h1>

      <p>Before integrating with RIVaaS, integrator needs to contact Innovatrics representative and provide:</p>

      <p>verifi edUrl (VERIFIED_URL) - URL of the web platform to which RIVaaS will redirect the user after successful identity verifi cation.</p>

      <p>rejectedUrl (REJECTED_URL) - URL to which RIVaaS will redirect the user when verifi cation result is rejected or failed.</p>

      <p>unverifi edUrl (UNVERIFIED_URL) - URL to which RIVaaS will redirect the user when the verifi cation was cancelled by user.</p>

      <p>callbackUrl (CALLBACK_URL) - URL to which RIVaaS API will send sensitive</p>

      <p>information about customer in case of successful verifi cation.</p>

      <p>logoUrl (LOGO_URL) - URL to image of company logo of the integrator that will be displayed in RIVaaS App. (SVG for light background recommended, PNG</p>

      <p>supported too)</p>

      <p>Also, it is good practice to provide CUSTOMER_NAME for customer identifi cation.</p>

      <p>After providing these, the integrator will obtain:</p>

      <p>Auth0 client id (AUTH0_CLIENT_ID) Auth0 client secret (AUTH0_CLIENT_SECRET) Auth0 issuer base URL (AUTH0_ISSUER_BASE_URL) RIVaaS service URL (RIVAAS_SERVICE_URL) RIVaaS app URL (RIVAAS_APP_URL)</p>

      <p>It is necessary for the integrator to ensure the following parts of the solution:</p>

      <h1>InnovAtcIes</h1>

      <p>backend application* frontend application (website).</p>

      <p>*The requirement for the backend application is there because every customer has to authenticate against Auth0. Since frontend applications are public, it should be avoided to store Auth0 client secret in them. As a result, integrator's account at RIVaaS could be exploited. Therefore, it is the backend application that is required to authenticate against Auth0 and get JWT token. This token is then used to authenticate all calls against RIVaaS API.</p>

      <h1>3 How to integrate with RIVaaS</h1>

      <p>Before integrating with RIVaaS, please have a look at the overall concept of RIVaaS integration in the Concept section.</p>

      <p>If you are ready to integrate with RIVaaS, please proceed to the Integration steps section.</p>

      <h1>3.1 Concept</h1>

      <p>Before integrator proceeds to integrate with RIVaaS, it's essential to understand how data fl ows between RIVaaS and integrator's applications. From higher-level perspective, the RIVaaS ID verifi cation process can be split into the following steps:</p>

      <p>01 User starts remote identity verifi cation on integration website.</p>

      <p>02 Website requests session token from integration backend.</p>

      <p>03 Integration backend requests JWT from Auth0 using provided client id and secret.</p>

      <p>04 Auth0 returns JWT to integration backend.</p>

      <p>05 Integration backend requests session token from RIVaaS API using JWT.</p>

      <p>06 Integration backend returns session token to integration website.</p>

      <p>07 Integration website redirects user to RIVaaS App with session token or loads RIVaaS iframe with session token.</p>

      <h1>InnoVAtcies</h1>

      <p>08 User verifi es himself in RIVaaS App.</p>

      <p>09 RIVaaS API provides customer sensitive data to integration backend via webhook HTTP POST request.</p>

      <p>10 RIVaaS App returns user's verifi cation result either as a redirect to specifi ed integration website or as a message in RIVaaS iframe.</p>

      <p>To better understand the fl ow, please refer to the sequence diagrams below.</p>

      <h1>3.1.1 Redirect fl ow</h1>

      <img src="https://www.innovatrics.com/wp-content/uploads/2025/02/images/42a17cfd9d7588dcadc283378a8b5f08bb18dcf9d0a95e9ad659e0d5a868de98.jpg" alt="Redirect flow diagram" />

      <h1>Innov^tcies</h1>

      <h1>3.1.2 Iframe fl ow</h1>

      <img src="https://www.innovatrics.com/wp-content/uploads/2025/02/images/6684f553f0290b7fadb47c42ca7648832075ee16f1a1776338da76192b9e6976.jpg" alt="Iframe flow diagram" />

      <h1>3.2 Integration steps</h1>

      <h1>3.2.1 Obtain JWT from Auth0</h1>

      <p>First step is to obtain a JWT from Auth0. This is done by calling the Auth0 API with provided client id and secret. This step is done on the integration backend.</p>

      <h1>Innov^tcies</h1>

      <p>JWT token is not one time token. It is valid for one week so we strongly recommend to store it in a secure way and refresh it when needed.</p>

      <p>In the example below, we use fetch function to call Auth0 API in JavaScript. Please note that this is just an example and you can use any other library to call Auth0 API.</p>

      <p>JavaScript</p>

      <pre>{`const AUTH0_ISSUER_BASE_URL = '';

const AUTH0_CLIENT_ID = '';

const AUTH0_CLIENT_SECRET = '';

try { 
  const response = await fetch(\`\${AUTH0_ISSUER_BASE_URL}/oauth/token\`, { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify({ 
      audience: 'https://verify-identity.innovatrics.com/service', 
      grant_type: 'client_credentials', 
      client_id: AUTH0_CLIENT_ID, 
      client_secret: AUTH0_CLIENT_SECRET, 
    }), 
  }); 
  
  if (!response.ok) { 
    throw new Error(\`HTTP error! status: \${response.status}\`); 
  } 
  
  const data = await response.json(); 
  // use data
} catch (error) { 
  // Refresh token if needed 
  // handle error
}`}</pre>

      <p>It is a good practice to implement refresh token mechanism in case the JWT expires.</p>

      <h1>Innov^tcies</h1>

      <h1>3.2.2 Obtain session token from RIVaaS API</h1>

      <p>Second step is to obtain a session token from the RIVaaS API. This is done by calling the RIVaaS API with the JWT obtained in previous step. This step is also done on the integration backend.</p>

      <p>In the example below, is the fetch function used to call the RIVaaS API in JavaScript. Please note that this is just an example and you can use any other library to call the RIVaaS API.</p>

      <p>JavaScript</p>

      <pre>{`const RIVAAS_SERVICE_URL = 'https://';

const ACCESS_TOKEN = '';

const LOCALE = 'en'; //desired localization for RIVaaS App

try { 
  const response = await fetch(\`\${RIVAAS_SERVICE_URL}/api/v1/session\`, { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json', 
      Authorization: \`Bearer \${ACCESS_TOKEN}\`, 
    }, 
    body: JSON.stringify({ 
      configuration: { 
        locale: LOCALE, 
      }, 
    }), 
  }); 
  
  if (!response.ok) { 
    throw new Error(\`HTTP error! status: \${response.status}\`); 
  } 
  
  const data = await response.json(); 
  // use data
} catch (error) { 
  // handle error
}`}</pre>

      <h1>Innov^tcies</h1>

      <h1>3.2.3 Initialization of RIVaaS App</h1>

      <p>RIVaaS App is a web application that can be accessed either as a standalone web application (redirect) or as an iframe. In both cases, RIVaaS App needs to be initialized with the session token obtained in the previous step.</p>

      <h1>Redirect fl ow</h1>

      <p>In case of the redirect fl ow, RIVaaS App is initialized by redirecting the user to RIVaaS App with the session token as a query parameter.</p>

      <p>Example below is written in vanilla JavaScript, but you can use any other library to redirect. JavaScript</p>

      <pre>{`const RIVAAS_APP_URL = 'https://'; 
const SESSION_TOKEN = '';

return (window.location.href = \`\${RIVAAS_APP_URL}/?sessionToken=\${SESSION_TOKEN}\`);`}</pre>

      <h1>Iframe fl ow</h1>

      <p>In case of the iframe fl ow, RIVaaS App is initialized by loading RIVaaS iframe with session token and viewType as a query parameter.</p>

      <p>Example below is written in vanilla JavaScript, but you can use any other library to create the iframe.</p>

      <p>JavaScript</p>

      <h1>Innov^tcies</h1>

      <pre>{`const SESSION_TOKEN = '';

const VIEW_TYPE = 'iframe';

const iframeUrl = \`\${RIVAAS_APP_URL}?sessionToken=\${SESSION_TOKEN}&viewType=\${VIEW_TYPE}\`;

const iframeElement = document.createElement('iframe');

iframeElement.src = iframeUrl;

iframeElement.width = '100%';

iframeElement.height = '100%';

iframeElement.allow = 'camera';

iframeElement.style.border = 'none'; // add this line if you want to remove border around iframe

document.body.appendChild(iframeElement);`}</pre>

      <h1>3.2.4 User identity verifi cation</h1>

      <p>This is the part where the main functionality happens. User is now in RIVaaS App and he needs to verify his identity. This is done by providing selfi e and a photo of his ID card. After user provides these, RIVaaS App will upload them to the RIVaaS API for verifi cation. After verifi cation is done, RIVaaS App will either redirect the user back to the integration website with the verifi cation result or post the result through postMessage in case of the iframe.</p>

      <h1>Innov^tcies</h1>

      <h1>3.2.5 Obtaining verifi cation result and data</h1>

      <p>In this part, user provided necessary data for verifi cation. Now, RIVaaS will provide data from verifi cation to integrator. Overall status of verifi cation will be sent to integrator via redirect (Redirect fl ow) or postMessage (iframe fl ow). Sensitive data of verifi ed user will be sent to integrator via webhook event API.</p>

      <h1>Verifi cation result</h1>

      <p>Both fl ows provide the same verifi cation result. The verifi cation result consists of the following parameters:</p>

      <p>status - Overall status of verifi cation (success | failed)</p>

      <p><strong>Redirect flow</strong></p>

      <p>In case of the redirect fl ow, RIVaaS App will redirect user back to the integration website with the verifi cation result as a query parameter. Please note that the user might not be redirected back to the same page where he started the remote identity verifi cation. He will be redirected to the page specifi ed in VERIFIED_URL, REJECTED_URL or UNVERIFIED_URL.</p>

      <p>Result of user verifi cation is in query parameters.</p>

      <p>Successful verifi cation result example:</p>

      <p>JavaScript</p>

      <pre>https://www.rivaas-customer.com/happy-path?status=success</pre>

      <p><strong>Iframe flow</strong></p>

      <p>In case of iframe fl ow, RIVaaS App will post verifi cation result to the integration website using postMessage API. See more about postMessage API mdn documentation.</p>

      <p>Please note that the verifi cation result is posted to the same page where the user</p>

      <h1>Innov^tcies</h1>

      <p>started remote identity verifi cation.</p>

      <p>Result of user verifi cation is posted as a message containing the verifi cation result.</p>

      <p>Example of postMessage listener:</p>

      <p>JavaScript</p>

      <pre>{`window.addEventListener('message', (event) => { 
  if (event.origin !== 'https://www.rivaas-customer.com/') { 
    return; 
  } 
  
  const { data } = event; 
  // process data
});`}</pre>

      <p>Please note that event.origin will be parsed from VERIFIED_URL provided to Innovatrics initially.</p>

      <h1>Webhook event API</h1>

      <p>Before user will be redirected back to the integration website or the verifi cation result will be posted through postMessage, the integration backend (API) will receive the customer sensitive data from RIVaaS API via webhook event. WebHook event is represented as an (response) object with the type of event and data. With webhook event API, we can send various data. Right now, we have only one type of webhook event VERIFICATION_SUCCEEDED</p>

      <h1>WebHookEvent type</h1>

      <h1>Innov^tcies</h1>

      <p>JavaScript</p>

      <pre>{`enum WebHookEventType { 
  VERIFICATION_SUCCEEDED = 'VERIFICATION_SUCCEEDED',
}`}</pre>

      <h1>WebHookEvent object type</h1>

      <p>JavaScript</p>

      <pre>{`type WebHookEvent = { 
  event: WebHookEventType; 
  data: T;
};`}</pre>

      <p>Integration backend has to handle this request and store the data in a secure way. The integration backend should also return HTTP 204 No Content to RIVaaS API to confi rm that the data was received and stored.</p>

      <p>VERIFICATION_SUCCEEDED webhook event data will contain the following parameters:</p>

      <p>sessionToken - Identifi er of the session</p>

      <p>result - Overall status of verifi cation (will be always VERIFIED)</p>

      <p>timestamp - Timestamp of verifi cation result used for verifi cation of result integrity</p>

      <p>customer - Object containing sensitive data of verifi ed address - Object containing address of verifi ed user fullAddress - Full address (e.g. 5 4th Street New York) of verifi ed user documentNumber - Document number of verifi ed ID card dateOfBirth - Date of birth of verifi ed user dateOfExpiry - Date of expiry of verifi ed ID card fullName - Full name of verifi ed user</p>

      <h1>Innov^tcies</h1>

      <p>placeOfBirth - Place of birth of verifi ed user selfie - Base64 encoded selfi e of verifi ed user</p>

      <h1>VERIFICATION_SUCCEEDED webhook event data type</h1>

      <p>JavaScript</p>

      <pre>{`export type VerificationSucceededResult = { 
  customer: { 
    address: { 
      fullAddress?: string; 
    }; 
    documentNumber?: string; 
    dateOfBirth?: string; 
    dateOfExpiry?: string; 
    fullName?: string; 
    placeOfBirth?: string; 
    selfie: string; 
  }; 
  timestamp: string; 
  result: SESSION_STATE; 
  sessionToken?: string;
};`}</pre>

      <h1>3.3 Error Handling</h1>

      <p>All the errors that could occur in integration are returned as HTTP status codes and will be handled by RIVaaS App. Integrator has to handle only the errors that might occur during initialization of the RIVaaS App or when retrieving the verifi cation result.</p>

      <p>For security reasons, RIVaaS App does not return any error details to integration website. Every error has a "tracing ID". This ID is unique for every error and it is used for debugging purposes. If any error is encountered, please contact Innovatrics providing the tracing ID in the error message to analyze the issue.</p>
    </div>
  );
}