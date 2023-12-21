package edu.brown.cs.student.main.datasource;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Handler.movieHandler;
import edu.brown.cs.student.main.csv.FactoryFailureException;
import okio.Buffer;
import org.junit.Before;
import org.junit.Test;
import org.junit.After;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import spark.Spark;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestServer {

    /** Taken directly from the livecode as stencil. */
    @BeforeAll
    public static void setupBeforeEverything() {
        // Set the Spark port number. This can only be done once, and has to
        // happen before any route maps are added.
        Spark.port(0); // Select an arbitrary port.
        Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
    }

    /** Taken directly from the livecode as stencil. */
    @After
    public void tearDown() {
        Spark.unmap("recommendation");
        Spark.awaitStop(); // Don't proceed until the server is stopped.
    }

    private final Type mapStringObject =
            Types.newParameterizedType(Map.class, String.class, Object.class);
    private JsonAdapter<Map<String, Object>>
            adapter;

    /**
     * Runs before EACH testcase. Taken generally (with some modifications) from the livecode as
     * stencil.
     */
    @Before
    public void setup() throws IOException, FactoryFailureException {
        Spark.get("recommendation", new movieHandler());
        Spark.awaitInitialization(); // Don't continue until the server is listening.

        // New Moshi adapter for responses (and requests, too; see a few lines below)
        Moshi moshi = new Moshi.Builder().build();
        adapter = moshi.adapter(mapStringObject);
    }

    /**
     * Helper to start a connection to a specific API endpoint/params. The "throws IOException" clause
     * doesn't signify anything -- JUnit will just error out if the exception wasn't declared as a
     * parameter. Taken directly from livecode with some modifications as stencil.
     *
     * @param apiCall the call string, including endpoint
     * @return the connection for the given URL, just after connecting
     * @throws IOException if the connection fails for some reason
     */
    private HttpURLConnection tryRequest(String apiCall) throws IOException {

        // Configure the connection (but don't actually send a request yet)
        // ** We structure this a bit differently from the livecode because we know what endpoint we're
        // listening at. However we want to test ILL FORMED json requests so keep generic JSON request.
        URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
        HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
        // The request body contains a Json object
        clientConnection.setRequestProperty("Content-Type", "application/json");
        // We're expecting a Json object in the response body
        clientConnection.setRequestProperty("Accept", "application/json");
        clientConnection.connect();
        return clientConnection;
    }

    /**
     * Runs multiple tests to check if the server is properly handling both proper and improper requests
     * @throws IOException
     */
    @Test
    public void testQuery() throws IOException {

        // Checks if the server returns the correct error message if no title is provided
        HttpURLConnection loadConnection1 =
                tryRequest("recommendation");
        assertEquals(200, loadConnection1.getResponseCode());
        Map<String, Object> body1 =
                adapter.fromJson(new Buffer().readFrom(loadConnection1.getInputStream()));
        Assertions.assertEquals("error_bad_request", body1.get("result"));

        HttpURLConnection loadConnection2 =
                tryRequest("recommendation?target=");
        assertEquals(200, loadConnection2.getResponseCode());
        Map<String, Object> body2 =
                adapter.fromJson(new Buffer().readFrom(loadConnection2.getInputStream()));
        Assertions.assertEquals("error_bad_request", body2.get("result"));

        // Checks if the correct error message is sent if a title is provided which does not exist
        // in our data
        HttpURLConnection loadConnection6 =
                tryRequest("recommendation?target=asgafasf");
        assertEquals(200, loadConnection6.getResponseCode());
        Map<String, Object> body6 =
                adapter.fromJson(new Buffer().readFrom(loadConnection6.getInputStream()));
        Assertions.assertEquals("error_datasource", body6.get("result"));

        HttpURLConnection loadConnection7 =
                tryRequest("recommendation?target=dune&year=2021");
        assertEquals(200, loadConnection7.getResponseCode());
        Map<String, Object> body7 =
                adapter.fromJson(new Buffer().readFrom(loadConnection7.getInputStream()));
        Assertions.assertEquals("error_datasource", body7.get("result"));


        // Confirms that success messages are sent for proper inputs
        HttpURLConnection loadConnection3 =
                tryRequest("recommendation?target=blade+runner");
        assertEquals(200, loadConnection3.getResponseCode());
        Map<String, Object> body3 =
                adapter.fromJson(new Buffer().readFrom(loadConnection3.getInputStream()));
        Assertions.assertEquals("success", body3.get("result"));

        HttpURLConnection loadConnection4 =
                tryRequest("recommendation?target=blade+runner&year=");
        assertEquals(200, loadConnection4.getResponseCode());
        Map<String, Object> body4 =
                adapter.fromJson(new Buffer().readFrom(loadConnection4.getInputStream()));
        Assertions.assertEquals("success", body4.get("result"));

        HttpURLConnection loadConnection5 =
                tryRequest("recommendation?target=blade+runner&year=1982");
        assertEquals(200, loadConnection5.getResponseCode());
        Map<String, Object> body5 =
                adapter.fromJson(new Buffer().readFrom(loadConnection5.getInputStream()));
        Assertions.assertEquals("success", body5.get("result"));
    }
}
