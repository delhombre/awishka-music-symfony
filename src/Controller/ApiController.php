<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    /**
     * HTTP status code - 200 (OK) by default
     *
     * @var integer
     */
    protected $statusCode = 200;

    /**
     * Gets the value of statusCode
     *
     * @return integer
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * Sets the value of statusCode
     *
     * @param integer $statusCode
     * @return self
     */
    protected function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * Returns a JSON response
     *
     * @param array $data
     * @param array $headers
     * @return JsonResponse
     */
    public function response($data, $headers = [])
    {
        return $this->json($data, $this->getStatusCode(), $headers);
    }

    /**
     * Sets an error message and returns a JSON response
     *
     * @param string $errors
     * @param array $headers
     * @return JsonResponse
     */
    public function respondWithErrors($errors, $headers = [])
    {
        $data = [
            'status' => $this->getStatusCode(),
            'errors' => $errors
        ];

        return $this->json($data, $this->getStatusCode(), $headers);
    }

    /**
     * Sets a success message and returns a JSON response
     *
     * @param string $success
     * @param array $headers
     * @return JsonResponse
     */
    public function respondWithSuccess($success, $headers = [])
    {
        $data = [
            'status' => $this->getStatusCode(),
            'success' => $success
        ];

        return $this->json($data, $this->getStatusCode(), $headers);
    }

    /**
     * Returns a 401 Unauthorized http response
     *
     * @param string $message
     * @return JsonResponse
     */
    public function respondUnauthorized($message = "Not authorized")
    {
        return $this->setStatusCode(401)->respondWithErrors($message);
    }

    /**
     * Returns a 422 Unprocessable Entity
     *
     * @param string $message
     * @return JsonResponse
     */
    public function respondValidationError($message = "Validation Errors")
    {
        return $this->setStatusCode(422)->respondWithErrors($message);
    }

    /**
     * Returns 404 Not Found
     *
     * @param string $message
     * @return JsonResponse
     */
    public function respondNotFound($message = "Not found !")
    {
        return $this->setStatusCode(404)->respondWithErrors($message);
    }

    /**
     * Returns a 201 created
     *
     * @param array $data
     * @return JsonResponse
     */
    public function respondCreated($data = [])
    {
        return $this->setStatusCode(201)->response($data);
    }

    /**
     * This method allows us to accept JSON payloads in POST requests
     *
     * @param Request $request
     * @return Request
     */
    protected function transformJsonBody(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        if ($data === null) {
            return $request;
        }

        $request->request->replace($data);

        return $request;
    }
}
