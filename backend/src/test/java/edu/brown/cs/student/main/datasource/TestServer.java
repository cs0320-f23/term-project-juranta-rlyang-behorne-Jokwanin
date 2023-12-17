package edu.brown.cs.student.main.datasource;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Handler.movieHandler;
import edu.brown.cs.student.main.csv.FactoryFailureException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import spark.Spark;

import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

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
    @AfterEach
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
    @BeforeEach
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
}
